import React, { useState, createRef, useEffect } from "react";
import { useUser, useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import { Database } from '../../utils/database.types';
import AccountAvatar from "./AccountAvatar";
import { imagesCdnAddress } from "../../constants/cdn";
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import PlanetEditor from "../../pages/generator/planet-editor";
import { useScreenshot } from "use-react-screenshot";

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function OffchainAccount({ session }: { session: Session}) {
    const supabase = useSupabaseClient<Database>();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<Profiles['username']>(null);
    const [website, setWebsite] = useState<Profiles['website']>(null); // I believe this is the email field
    const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null);
    const [address, setAddress] = useState<Profiles['address']>(null); // This should be set by the handler eventually (connected address).
    const [images, setImages] = useState([]);

    const ref = createRef();
    let width = '1080'
    const [image, takeScreenShot] = useScreenshot();

    const getImage = () => takeScreenShot(ref.current);

    useEffect(() => {
        getProfile();
        console.log(user.id)
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!user) throw new Error('No user authenticated');
            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, address`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setAddress(data.address);
            }
        } catch (error) {
            alert('Error loading your user data');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
        address,
    } : {
        username: Profiles['username']
        website: Profiles['website']
        avatar_url: Profiles['avatar_url']
        address: Profiles['address']
    }) {
        try {
            setLoading(true);
            if (!user) throw new Error('No user authenticated!');
            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                address,
                updated_at: new Date().toISOString(),
            }
            let { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;
            alert('Off-chain Profile updated');
        } catch (error) {
            alert('Error updating your profile data:');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    // Gallery components
    // Retrieving gallery data for user
    async function getImages() {
        const { data, error } = await supabase
            .storage
            .from('images')
            .list(user?.id + '/', {
                limit: 100, // Get 100 images from this dir
                offset: 0,
                sortBy: {
                    column: 'name',
                    order: 'asc'
                }
            });

        if ( data !== null ) {
            setImages(data);
        } else {
            alert('Error loading images');
            console.log(error);
        }
    }

    async function uploadImage(e) {
        let file = e.target.files[0];
        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(user.id + '/' + uuidv4(), file);

        if (data) {
            getImages();
        } else {
            console.log(error);
        }
    }

    async function uploadScreenshot(e) {
        let file = image + '.png';
        const { data, error } = await supabase
            .storage
            .from('images')
            .upload(user.id + '/' + uuidv4(), file);

        if (data) {
            getImages();
        } else {
            console.log(error);
        }
    }

    async function deleteImage (imageName) {
        const { error } = await supabase
            .storage
            .from('images')
            .remove([ user.id + '/' + imageName ])

        if (error) {
            alert (error);
        } else {
            getImages();
        }
    }

    useEffect(() => {
        if (user) { // Only get images IF the user exists and is logged in
            getImages(); // Add a getPosts function to get a user's profile posts
        }
    }, [user]);

    function convertURIToImageData(URI) {
        return new Promise(function(resolve, reject) {
          if (URI == null) return reject();
          var canvas = document.createElement('canvas'),
              context = canvas.getContext('2d'),
              image = new Image();
          image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
          }, false);
          image.src = URI;
        });
    }

    return (
        <div className="form-widget">
            <AccountAvatar
                uid={user!.id}
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ username, website, avatar_url: url, address})
                }}
            />
            <div>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text' value={session.user.email} disabled />
            </div>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    type='text'
                    value={ username || '' }
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='website'>Website</label>
                <input
                    id='website'
                    type='website'
                    value={ website || '' }
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='address'>Address</label>
                <input
                    id='address'
                    type='text'
                    value={ address || '' }
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="button primary block"
                    onClick={() => updateProfile({ username, website, avatar_url, address })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>
            <br />
            <div>
                <button style={{ marginBottom: "10px" }} onClick={getImage}>
                    Take screenshot
                </button>
            </div>
            <img width={width} src={image} alt={"ScreenShot"} />
            <div
                ref={ref as React.RefObject<HTMLDivElement>}
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginTop: "20px"
                }}
            >
                <PlanetEditor />
            </div>
            <br />
            <Container className='container-sm mt-4 mx-auto border-5 border-emerald-500'>
                <>
                    <h1>Your photos</h1>
                    <br />
                    <p>Upload image of your model for analysis</p>
                    <Form.Group className="mb-3" style={{maxWidth: '500px'}}>
                        <Form.Control type='file' accept='image/png, image/jpeg' onChange={(e) => uploadImage(e)} />
                    </Form.Group>
                    <Button variant='outline-info' onClick={() => uploadScreenshot(image)} />
                    <br />
                    <hr />
                    <br />
                    <h3>Your images</h3>
                    <Row className='g-4'>
                        {images.map((image) => {
                            return (
                                <Col key={imagesCdnAddress + user.id + '/' + image.name}>
                                    <Card>
                                        <Card.Img variant='top' src={imagesCdnAddress + user.id + '/' + image.name} />
                                        <Card.Body>
                                            <Button variant='danger' onClick={() => deleteImage(image.name)}>Delete image</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </>
            </Container>
            <div>
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}
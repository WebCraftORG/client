import React, { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import PostModal from "./FeedPostCard";
import PostFormCard from "../PostFormCard";
import { UserContext } from "../../context/UserContext";

export default function SocialGraphHomeModal() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [planetPosts, setPlanetPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [session?.user?.id]);

  useEffect(() => {
    if (planetPosts.length > 0) {
      console.log("Comments: ", planetPosts.flatMap((post) => post.comments));
    }
  }, [planetPosts]);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }

    supabase
      .from("profiles")
      .select()
      .eq("id", session?.user?.id)
      .then((result) => {
        if (result.data.length) {
          setProfile(result.data[0]);
        }
      });
  }, [session?.user?.id]);

  function fetchPosts() {
    supabase
      .from('comments')
      .select("id, content, created_at, profiles(id, avatar_url, username), post_id")
      .order('created_at', { ascending: false })
      .then((result) => {
        const comments = result.data.reduce((acc, comment) => {
          if (!acc[comment.post_id]) { acc[comment.post_id] = []; };
          acc[comment.post_id].push(comment);
          return acc;
        }, {});

        supabase
      .from("posts_duplicates")
      .select(
        "id, content, created_at, planets2, planetsss(id, temperature), profiles(id, avatar_url, full_name, username)"
      )
      .order("created_at", { ascending: false })
      .then((result) => {
        setPlanetPosts(result.data);
      });
      })
  }

  return (
    <div className="container mx-auto py-8">
        {/* <UserContext.Provider value={{profile}}><PostFormCard onPost={fetchPosts()} /></UserContext.Provider><br /> */}
        <div className="flex-grow flex flex-col overflow-hidden">
        {planetPosts?.map((post) => (
          <PostModal key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
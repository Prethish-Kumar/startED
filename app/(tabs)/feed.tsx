import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import CommentModal from "../components/CommentModal";

type Post = {
  id: string;
  authorName: string;
  authorSchool: string;
  authorAvatar?: string;
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  clipPosition: "left" | "right";
};

const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    authorName: "Harwin Ramoj",
    authorSchool: "Don Bosco School",
    content:
      "Just completed building my first app using React native 🚀\n#codingforlife",
    imageUrl:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=400&fit=crop",
    likes: 120,
    commentsCount: 14,
    clipPosition: "right",
  },
  {
    id: "2",
    authorName: "Sarah Johnson",
    authorSchool: "Lincoln High School",
    content:
      "Excited to share my science project on renewable energy! ⚡️🌱",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=400&fit=crop",
    likes: 85,
    commentsCount: 8,
    clipPosition: "left",
  },
  {
    id: "3",
    authorName: "Michael Chen",
    authorSchool: "St. Mary's Academy",
    content: "Our robotics team just won the regional championship! 🤖🏆",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop",
    likes: 203,
    commentsCount: 27,
    clipPosition: "right",
  },
];

export default function Feed() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="StartED" icon="notifications" />
      <ScrollView style={{ flex: 1 }}>
        {SAMPLE_POSTS.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorSchool={post.authorSchool}
            authorAvatar={post.authorAvatar}
            content={post.content}
            imageUrl={post.imageUrl}
            initialLikes={post.likes}
            commentsCount={post.commentsCount}
            clipPosition={post.clipPosition}
            onCommentPress={() => setSelectedPost(post)}
          />
        ))}
      </ScrollView>

      {selectedPost && (
        <CommentModal
          visible={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          postAuthor={selectedPost.authorName}
          initialComments={[
            {
              id: "1",
              author: "Emma Wilson",
              content: "This is amazing! Great work! 👏",
              timestamp: "2h ago",
            },
            {
              id: "2",
              author: "Alex Thompson",
              content: "Can you share more details about this?",
              timestamp: "1h ago",
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}

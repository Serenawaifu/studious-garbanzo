// components/Forum.tsx

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import io from 'socket.io-client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const socket = io('http://localhost:3001');

interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  votes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  user: string;
  votes: number;
}

const Forum = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');

  useEffect(() => {
    // Fetch posts from an API or database
    // For demonstration, we'll use static posts
    const staticPosts = [
      {
        id: '1',
        title: 'Anime Talk: New Season of Demon Slayer',
        content: 'What do you think about the new season?',
        user: 'User1',
        votes: 10,
        replies: [
          {
            id: '1',
            content: 'It looks amazing!',
            user: 'User2',
            votes: 5,
          },
          {
            id: '2',
            content: 'Can't wait to see it!',
            user: 'User3',
            votes: 3,
          },
        ],
      },
      {
        id: '2',
        title: 'Fan Art: My Naruto Drawing',
        content: 'Check out my drawing of Naruto!',
        user: 'User4',
        votes: 8,
        replies: [
          {
            id: '1',
            content: 'Great job!',
            user: 'User5',
            votes: 4,
          },
        ],
      },
      // Add more posts as needed
    ];

    setPosts(staticPosts);

    socket.on('replyReceived', (data) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === data.postId
            ? {
                ...post,
                replies: [...post.replies, data.reply],
              }
            : post
        )
      );
    });

    return () => {
      socket.off('replyReceived');
    };
  }, []);

  const handlePostTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPostTitle(e.target.value);
  };

  const handlePostContentChange = (value: string) => {
    setNewPostContent(value);
  };

  const handleNewPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session && newPostTitle && newPostContent) {
      const newPost: Post = {
        id: String(posts.length + 1),
        title: newPostTitle,
        content: newPostContent,
        user: session.user.name || 'Anonymous',
        votes: 0,
        replies: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const handleReplyContentChange = (value: string) => {
    setNewReplyContent(value);
  };

  const handleNewReplySubmit = (postId: string) => {
    if (session && newReplyContent) {
      const newReply: Reply = {
        id: String(Math.random()),
        content: newReplyContent,
        user: session.user.name || 'Anonymous',
        votes: 0,
      };
      socket.emit('newReply', { postId, reply: newReply });
      setNewReplyContent('');
    }
  };

  const handleVote = (postId: string, voteType: 'upvote' | 'downvote') => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              votes: voteType === 'upvote' ? post.votes + 1 : post.votes - 1,
            }
          : post
      )
    );
  };

  const handleReplyVote = (postId: string, replyId: string, voteType: 'upvote' | 'downvote') => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      votes: voteType === 'upvote' ? reply.votes + 1 : reply.votes - 1,
                    }
                  : reply
              ),
            }
          : post
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Forum</h1>
      <Protected>
        <form onSubmit={handleNewPostSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="postTitle"
              value={newPostTitle}
              onChange={handlePostTitleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              theme="snow"
              value={newPostContent}
              onChange={handlePostContentChange}
              className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Submit Post
          </button>
        </form>
      </Protected>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-700 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleVote(post.id, 'upvote')}
                  className="bg-gray-800 text-white px-2 py-1 rounded-md"
                >
                  👍 {post.votes}
                </button>
                <button
                  onClick={() => handleVote(post.id, 'downvote')}
                  className="bg-gray-800 text-white px-2 py-1 rounded-md"
                >
                  👎
                </button>
              </div>
            </div>
            <p className="text-sm mb-2">{post.content}</p>
            <span className="text-sm">Posted by {post.user}</span>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Replies</h3>
              <div className="space-y-2">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-800 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm">{reply.content}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReplyVote(post.id, reply.id, 'upvote')}
                          className="bg-gray-900 text-white px-2 py-1 rounded-md"
                        >
                          👍 {reply.votes}
                        </button>
                        <button
                          onClick={() => handleReplyVote(post.id, reply.id, 'downvote')}
                          className="bg-gray-900 text-white px-2 py-1 rounded-md"
                        >
                          👎
                        </button>
                      </div>
                    </div>
                    <span className="text-sm">Replied by {reply.user}</span>
                  </div>
                ))}
              </div>
              <Protected>
                <div className="mt-4">
                  <ReactQuill
                    theme="snow"
                    value={newReplyContent}
                    onChange={handleReplyContentChange}
                    className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleNewReplySubmit(post.id)}
                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit Reply
                  </button>
                </div>
              </Protected>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

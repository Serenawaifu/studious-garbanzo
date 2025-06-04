// pages/[category]/[id].tsx

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Protected from '../../components/Protected';

const DetailPage = () => {
  const router = useRouter();
  const { category, id } = router.query;
  const { data: session } = useSession();
  const [item, setItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch item details from an API or database
    // For demonstration, we'll use a static item
    const staticItems = {
      anime: {
        '1': {
          id: '1',
          title: 'Anime 1',
          description: 'Description for Anime 1',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Action', 'Adventure'],
          episodes: 12,
        },
        '2': {
          id: '2',
          title: 'Anime 2',
          description: 'Description for Anime 2',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Comedy', 'Slice of Life'],
          episodes: 24,
        },
      },
      manga: {
        '1': {
          id: '1',
          title: 'Manga 1',
          description: 'Description for Manga 1',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Shonen', 'Action'],
          chapters: 100,
        },
        '2': {
          id: '2',
          title: 'Manga 2',
          description: 'Description for Manga 2',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Seinen', 'Fantasy'],
          chapters: 50,
        },
      },
      manhwa: {
        '1': {
          id: '1',
          title: 'Manhwa 1',
          description: 'Description for Manhwa 1',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Romance', 'Drama'],
          chapters: 80,
        },
        '2': {
          id: '2',
          title: 'Manhwa 2',
          description: 'Description for Manhwa 2',
          poster: 'https://via.placeholder.com/200x300',
          tags: ['Horror', 'Thriller'],
          chapters: 60,
        },
      },
    };

    if (category && id && staticItems[category] && staticItems[category][id]) {
      setItem(staticItems[category][id]);
    }
  }, [category, id]);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session && comment) {
      setComments([...comments, { user: session.user.name, comment }]);
      setComment('');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{item.title} - Anime Platform</title>
        <meta name="description" content={item.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img src={item.poster} alt={item.title} className="w-full h-auto rounded-lg" />
          </div>
          <div className="md:w-2/3 md:ml-4">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-lg mb-4">{item.description}</p>
            <div className="mb-4">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded mr-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-4">
              {item.episodes && <span className="text-sm">Episodes: {item.episodes}</span>}
              {item.chapters && <span className="text-sm">Chapters: {item.chapters}</span>}
            </div>
            <Protected>
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rate this {category}
                </label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={handleRatingChange}
                  min="1"
                  max="10"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleCommentSubmit}
                  className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Submit Comment
                </button>
              </div>
            </Protected>
            <div>
              <h2 className="text-xl font-bold mb-2">Comments</h2>
              {comments.length > 0 ? (
                comments.map((c, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-md mb-2">
                    <h3 className="text-lg font-semibold">{c.user}</h3>
                    <p className="text-sm">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailPage;

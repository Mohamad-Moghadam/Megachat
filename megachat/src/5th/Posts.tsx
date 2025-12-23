import { useEffect, useState } from "react";

type Post = {
	id: number;
	title: string;
	body: string;
};

export default function Posts() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch("https://jsonplaceholder.typicode.com/posts");
				if (!res.ok) throw new Error("Failed to fetch posts");

				const data: Post[] = await res.json();
				setPosts(data.slice(0, 10));
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Something went wrong 😢");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
				<div className="max-w-3xl mx-auto space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="bg-white p-4 rounded-xl shadow animate-pulse"
						>
							<div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
							<div className="h-3 bg-gray-200 rounded w-full mb-2" />
							<div className="h-3 bg-gray-200 rounded w-5/6" />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<div className="bg-white p-6 rounded-xl shadow text-center">
					<p className="text-red-500 font-medium mb-2">Oops!</p>
					<p className="text-gray-600">{error}</p>
				</div>
			</div>
		);
	}
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

				<div className="grid gap-4">
					{posts.map((post) => (
						<div
							key={post.id}
							className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
						>
							<h2 className="font-semibold text-lg mb-2 line-clamp-2">
								{post.title}
							</h2>
							<p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>

							<div className="mt-4 flex justify-between items-center text-xs text-gray-400">
								<span>Post #{post.id}</span>
								<button className="text-blue-500 hover:underline">
									Read more
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

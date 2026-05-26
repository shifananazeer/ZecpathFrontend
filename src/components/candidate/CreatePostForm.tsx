import { useState } from "react";
import { createPost } from "../../services/postService";

type Visibility =
  | "public"
  | "private"
  | "connections";

const CreatePostForm = () => {
  const [content, setContent] =
    useState("");
  const [visibility, setVisibility] =
    useState<Visibility>("public");
  const [image, setImage] =
    useState<File | null>(null);
  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      setLoading(true);

      await createPost({
        content,
        visibility,
        image,
      });

      setContent("");
      setVisibility("public");
      setImage(null);

      alert(
        "Post created successfully!"
      );
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Create Post
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Content */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Post Content
            </label>

            <textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              rows={5}
              placeholder="What do you want to share?"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="block w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-300"
            />

            {image && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(
                    image
                  )}
                  alt="Preview"
                  className="h-48 w-full rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          {/* Visibility */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-300">
              Visibility
            </label>

            <div className="flex gap-6">
              {[
                "public",
                "private",
                "connections",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 capitalize text-white"
                >
                  <input
                    type="radio"
                    checked={
                      visibility ===
                      option
                    }
                    onChange={() =>
                      setVisibility(
                        option as Visibility
                      )
                    }
                    className="accent-indigo-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              !content.trim()
            }
            className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Posting..."
              : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
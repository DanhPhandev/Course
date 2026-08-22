import Link from "next/link";

type Problem = {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
};

const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Cho mảng số nguyên, tìm hai chỉ số có tổng bằng target.",
    difficulty: "Easy",
    tags: ["Array", "HashMap"],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description: "Kiểm tra chuỗi ngoặc có hợp lệ bằng stack.",
    difficulty: "Easy",
    tags: ["Stack"],
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    description: "Tìm độ dài chuỗi con dài nhất không có ký tự lặp.",
    difficulty: "Medium",
    tags: ["Sliding Window"],
  },
  {
    id: 4,
    title: "Merge K Sorted Lists",
    description: "Gộp K danh sách liên kết đã sắp xếp.",
    difficulty: "Hard",
    tags: ["Heap", "Linked List"],
  },
];

const difficultyStyle = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-amber-50 text-amber-800",
  Hard: "bg-red-100 text-red-800",
};

export default function PracticePage() {
  return (
    <main>
      {/* Banner */}
      <section className="bg-linear-to-br from-[#001c66] to-[#05369b] py-11.5 text-white">
        <div className="mx-auto w-[92%] max-w-295">
          <h1 className="text-center text-[38px] font-bold">
            Bài tập lập trình
          </h1>
        </div>
      </section>

      {/* Practice section */}
      <section className="bg-[#f6fcff] py-17.5">
        <div className="mx-auto w-[92%] max-w-295">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            {/* Search + Filter */}
            <div className="flex flex-wrap gap-2.5 rounded-[14px] border border-[#e5edf6] bg-white p-2 shadow-[0_8px_24px_rgba(0,28,102,0.05)]">
              <input
                type="text"
                placeholder="Tìm bài tập..."
                className="min-w-50 bg-transparent px-2.5 py-2 text-[#102033] outline-none placeholder:text-slate-400"
              />

              <select className="cursor-pointer bg-transparent px-2.5 py-2 text-[#102033] outline-none">
                <option value="">Độ khó</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select className="cursor-pointer bg-transparent px-2.5 py-2 text-[#102033] outline-none">
                <option value="">Dạng bài</option>
                <option value="Java">Array</option>
                <option value="Cpp">String</option>
                <option value="Python">Sorting</option>
                <option value="Python">Matrix</option>
              </select>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1.75 text-[13px] font-extrabold text-green-800">
                Đã giải: 18
              </span>

              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.75 text-[13px] font-extrabold text-amber-800">
                Đang làm: 7
              </span>

              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.75 text-[13px] font-extrabold text-slate-600">
                Tổng: 120
              </span>
            </div>
          </div>

          {/* Problem list */}
          <div className="grid gap-6">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="
                  grid grid-cols-1 items-center gap-4
                  rounded-2xl
                  border border-[#e5edf6]
                  bg-white
                  p-5
                  shadow-[0_14px_40px_rgba(0,28,102,0.09)]
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[0_18px_45px_rgba(0,28,102,0.13)]
                  sm:grid-cols-[1fr_auto]
                "
              >
                {/* Problem information */}
                <div>
                  <h3 className="mb-2.5 text-xl font-black text-[#001c66]">
                    {problem.title}
                  </h3>

                  <p className="mb-4 text-[#64748b]">{problem.description}</p>

                  <div className="flex flex-wrap gap-2.5">
                    {/* Difficulty */}
                    <span
                      className={`
                        inline-flex items-center
                        rounded-full
                        px-3
                        py-1.75
                        text-[13px]
                        font-extrabold
                        ${difficultyStyle[problem.difficulty]}
                      `}
                    >
                      {problem.difficulty}
                    </span>

                    {/* Tags */}
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.75 text-[13px] font-extrabold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/problem/${problem.id}`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border border-[#e5edf6]
                    bg-white
                    px-4.5
                    py-2.75
                    font-extrabold
                    text-[#001c66]
                    transition-all
                    hover:border-[#01adef]
                    hover:text-[#01adef]
                  "
                >
                  Làm bài
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

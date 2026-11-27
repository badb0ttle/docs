const AUTHOR_STATUSES = {
  work: {
    label: "施工中",
    message: "正在给博客拧螺丝",
    animation: "/assets/author-status/typing.gif",
    still: "/assets/author-status/typing.png",
  },
  rest: {
    label: "休息中",
    message: "站长去充电了",
    animation: "/assets/author-status/sleeping.gif",
    still: "/assets/author-status/sleeping.png",
  },
} as const;

export const getAuthorStatus = (value: unknown) => {
  if (value === "work" || value === "rest") return AUTHOR_STATUSES[value];
  return undefined;
};

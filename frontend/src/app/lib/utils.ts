export function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function truncateText(text: string, length: number) {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}
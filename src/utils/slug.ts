import slugify from "slugify";

export const generateSlug = (title: string, id: string) => {
    const trimmedTitle = title
        .split(/\s+/)
        .slice(0, 60)
        .join(' ');

    const cleanTitle = slugify(trimmedTitle, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });

    return `${cleanTitle}--${id}`;
};

// export const generateSlug = (title: string, id: string) => {
//     const slug = title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, '-')   // replace spaces/special chars with hyphen
//         .replace(/-+/g, '-')
//         .replace(/^-+|-+$/g, '')       // trim leading/trailing hyphens
//         .substring(0, 60);             // limit slug length (SEO safe)

//     return `${slug}-${id}`;
// };

export const extractIdFromSlug = (slug: string): string => {
    const parts = slug.split('-');
    return parts[parts.length - 1];
};
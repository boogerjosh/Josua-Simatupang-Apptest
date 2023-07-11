export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const validExtensions = [".jpg", ".png", ".webp", ".jpeg", "https"];
        const lowercaseURL = url.toLowerCase();
        return validExtensions.some((extension) => lowercaseURL.includes(extension));
    }
};


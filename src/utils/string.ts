export const toUpperCaseFirst = (text?: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const messageContent = (text: string, to: number) => {
    if (!text) return ""

    let mess = text
    const isTrue = text.length > to
    if (isTrue) mess = `${text.slice(0, to)}...`

    return mess
}
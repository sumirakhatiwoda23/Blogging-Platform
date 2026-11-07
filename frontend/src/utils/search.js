// removes HTML tags so the description can be searched as plain text
export const stripHtml = (html = '') =>
    html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()

// "startup  roadmap" -> ['startup', 'roadmap']
export const getWords = (query = '') => {
    const all = [...new Set(query.toLowerCase().split(/\s+/).filter(Boolean))]
    const long = all.filter((w) => w.length >= 2)   // ignore single letters like "a"
    return long.length ? long : all
}

// higher score = better match (title matters most)
export const scoreBlog = (blog, words) => {
    const title = (blog.title || '').toLowerCase()
    const sub = (blog.subTitle || '').toLowerCase()
    const cat = (blog.category || '').toLowerCase()
    const desc = stripHtml(blog.description || '').toLowerCase()

    let score = 0
    for (const w of words) {
        if (title.includes(w)) score += 3
        if (sub.includes(w)) score += 2
        if (cat.includes(w)) score += 1
        if (desc.includes(w)) score += 1
    }
    return score
}

// a short piece of the description around the first matching word
export const getSnippet = (text, words, length = 120) => {
    const lower = text.toLowerCase()
    let first = -1
    for (const w of words) {
        const i = lower.indexOf(w)
        if (i !== -1 && (first === -1 || i < first)) first = i
    }
    if (first === -1) return ''

    const start = Math.max(0, first - 40)
    const end = Math.min(text.length, start + length)
    return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '')
}
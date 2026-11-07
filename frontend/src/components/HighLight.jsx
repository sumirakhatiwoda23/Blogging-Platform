import React from 'react'

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const Highlight = ({ text = '', words = [] }) => {
    if (!words.length || !text) return <>{text}</>

    const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi')

    return (
        <>
            {text.split(pattern).map((part, i) =>
                i % 2 === 1 ? (
                    <mark key={i} className='bg-yellow-200 text-inherit rounded px-0.5'>
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    )
}

export default Highlight
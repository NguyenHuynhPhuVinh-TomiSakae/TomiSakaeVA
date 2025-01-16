/* eslint-disable prettier/prettier */
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
    content: string
    className?: string
}

export const Markdown = ({ content, className = '' }: MarkdownProps) => {
    return (
        <ReactMarkdown
            className={className}
            remarkPlugins={[remarkGfm]}
            components={{
                table: ({ node, ...props }) => (
                    <table
                        className="border-collapse border border-gray-300 my-4"
                        {...props}
                    />
                ),
                th: ({ node, ...props }) => (
                    <th
                        className="border border-gray-300 px-4 py-2 bg-gray-100"
                        {...props}
                    />
                ),
                td: ({ node, ...props }) => (
                    <td className="border border-gray-300 px-4 py-2" {...props} />
                ),
                h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold my-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-bold my-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                    <h3 className="text-lg font-bold my-2" {...props} />
                ),
                p: ({ node, ...props }) => (
                    <p className="my-4 whitespace-pre-line" {...props} />
                ),
                strong: ({ node, ...props }) => (
                    <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                del: ({ node, ...props }) => (
                    <del className="line-through" {...props} />
                ),
                ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside my-4 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside my-4 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => <li className="ml-4 mb-1" {...props} />,
                blockquote: ({ node, ...props }) => (
                    <blockquote
                        className="border-l-4 border-gray-300 pl-4 my-2 italic"
                        {...props}
                    />
                ),
                hr: ({ node, ...props }) => (
                    <hr className="my-4 border-t border-gray-300" {...props} />
                ),
                a: ({ node, ...props }) => (
                    <a className="text-blue-600 hover:underline" {...props} />
                ),
                img: ({ node, ...props }) => (
                    <img className="max-w-full h-auto my-2 rounded" {...props} />
                ),
            }}
        >
            {content.replace(/\[([a-zA-Z]*?)\]/g, '')}
        </ReactMarkdown>
    )
}

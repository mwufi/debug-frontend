'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const sampleMarkdown = `# Typography Test Page

This page demonstrates our typography styles with various markdown elements.

## Text Formatting

Regular paragraph with **bold text**, *italic text*, and ~~strikethrough~~. You can also use \`inline code\` for technical terms.

## Code Blocks

Here's a TypeScript example:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const user: User = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};
\`\`\`

And some Python:

\`\`\`python
def quicksort(arr: list) -> list:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(sorted_numbers)  # [1, 1, 2, 3, 6, 8, 10]
\`\`\`

## Lists

### Unordered List
* First item
  * Nested item 1
  * Nested item 2
    * Deep nested item
* Second item
* Third item with \`code\`

### Ordered List
1. First step
2. Second step
   1. Sub-step 1
   2. Sub-step 2
3. Final step

## Tables

| Feature   | Status | Description |
|-----------|--------|-------------|
| Typography | ✅     | Custom Tailwind typography styles |
| Dark Mode | ✅     | Automatic theme switching |
| Code      | ✅     | Syntax highlighting support |
| Tables    | ✅     | GFM table support |

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

And nested quotes:

> First level quote
>> Nested quote
>>> Deeper nested quote

## Links

* [GitHub](https://github.com) - The home of open source
* [TypeScript](https://www.typescriptlang.org/) - JavaScript that scales
* [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework

## Task Lists

- [x] Implement markdown support
- [x] Add code syntax highlighting
- [x] Style blockquotes
- [ ] Add image support
- [ ] Implement dark mode

---

That's all for now! This page helps us test and verify our typography styles.`

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-screen-md">
            <article className="prose dark:prose-invert prose-pre:bg-muted prose-pre:text-muted-foreground prose-code:bg-muted prose-code:text-muted-foreground prose-blockquote:border-muted-foreground/20 prose-a:text-primary prose-a:no-underline hover:prose-a:underline mx-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {sampleMarkdown}
                </ReactMarkdown>
            </article>
        </div>
    )
}

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import connectDB from './configs/db.js'
import imagekit from './configs/imagekit.js'
import Blog from './models/Blog.js'
import { blog_data } from './seedData.js'

await connectDB()

for (const item of blog_data) {
    try {
        // skip blogs that are already in the database
        const exists = await Blog.findOne({ title: item.title })
        if (exists) {
            console.log('Skipped (already exists):', item.title)
            continue
        }

        // upload the image to ImageKit
        const fileBuffer = fs.readFileSync(path.join('seed-images', item.image))
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: item.image,
            folder: '/blogs',
        })

        const image = imagekit.url({
            path: response.filePath,
            transformation: [{ quality: 'auto' }, { format: 'webp' }, { width: '1280' }],
        })

        await Blog.create({
            title: item.title,
            // removes any stray HTML tag (blog 2's subTitle has a <strong>)
            subTitle: item.subTitle?.replace(/<[^>]*>/g, '').trim(),
            description: item.description,
            category: item.category,
            image,
            isPublished: item.isPublished,
        })

        console.log('Added:', item.title)
    } catch (error) {
        console.log('Failed:', item.title, '-', error.message)
    }
}

console.log('Done')
process.exit()

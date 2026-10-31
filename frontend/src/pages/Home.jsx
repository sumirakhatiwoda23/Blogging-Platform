import React, { useState } from 'react'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'

const Home = () => {
    const [search, setSearch] = useState('')

    return (
        <>
            <Header onSearch={setSearch} />
            <BlogList search={search} />
            <Newsletter />
        </>
    )
}

export default Home
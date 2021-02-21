import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'
import {FeedbackLink} from '../components/FeedbackLink'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  useEffect(() => {
    let cleanupFunction = false
    const fetchLinks = async () => {
      try {
        const fetched = await request('/api/link', 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        if(!cleanupFunction) setLinks(fetched)
      } catch (e) {
        console.error(e.message)
      }
    }

    fetchLinks()
    return () => cleanupFunction = true
  }, [request, token])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
      <FeedbackLink />
    </>
  )
}

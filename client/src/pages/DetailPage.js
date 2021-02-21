import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinkCard} from '../components/LinkCard'
import {FeedbackLink} from '../components/FeedbackLink'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  const linkId = useParams().id

  useEffect(() => {
    let cleanupFunction = false
    const getLink = async () => {
      try {
        const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        if(!cleanupFunction) setLink(fetched)
      } catch (e) {
        console.error(e.message)
      }
    }

    getLink()
    return () => cleanupFunction = true
  }, [linkId, request, token])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCard link={link}/>}
      <FeedbackLink />
    </>
  )
}

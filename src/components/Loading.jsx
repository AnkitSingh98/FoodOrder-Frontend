import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

function Loading( {show} ) {


  return (
    
    show && (

        <Container className='text-center p-4'>
            <Spinner size='lg' />
            Loading...
        </Container>

    )
  )


}

export default Loading
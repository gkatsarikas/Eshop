import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Form, useNavigate } from 'react-router-dom'


export default function SearchBar() {
  
    const [title,setTitle] = useState('')
    const navigate = useNavigate()

    const searchHandler = (e: React.SyntheticEvent) => {
        e.preventDefault()
        navigate(`/product/${title}`)
    }

    return (
        <Form className="flex-grow-1 d-flex" onSubmit={searchHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            placeholder="Search Product by title"
            aria-label="Search Product"
            aria-describedby="button-search"
            onChange={(e) => setTitle(e.target.value)}
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>
      </Form>  
  )

}

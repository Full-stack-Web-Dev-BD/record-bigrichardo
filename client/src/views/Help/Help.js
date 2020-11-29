import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import About from './About'

const Help = () => {
    return (
        <div className="mt-5 col-md-8 offset-md-2">
            <Card>
                <CardContent>
                    <About />
                </CardContent>
            </Card>
        </div>
    )
}

export default Help

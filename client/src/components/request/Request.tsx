import { ChangeEvent, useState, } from 'react'
import { HTTPMethod, IRequest } from '../../context/collection/type'
import useRequest from '../../context/request/useRequest'
import Form from '../form/Form'
import { enumToMap } from '../../utils/helper'
import { Grid, Col } from '../grid/Grid'

const Request = ({ request, setRequest }: { request: IRequest, setRequest: Function }) => {
    const [requestResponse, setRequestResponse] = useState()
    const { update } = useRequest()

    const handleUpdate = async () => {
        await update(request._id, {
            title: request.title,
            url: request.url,
            method: request.method
        })
    }

    const sendRequest = async () => {
        try {
            const response = await fetch(request.url, {
                method: request.method
            })
            const result = await response.json()

            setRequestResponse(result)
        } catch (err: any) {
            setRequestResponse(err)
        }
    }

    return (
        <div className="px-2">
            <div className="flex items-center relative">
                <i className="bi bi-pencil absolute left-2"></i>
                <Form.Input
                    className="pl-8 font-bold !border-transparent"
                    value={request.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRequest({ ...request, title: e.target.value })}
                    onBlur={handleUpdate}
                />
            </div>

            <div className="mt-10">
                <Grid cols="8">
                    <Col>
                        <Form.Group>
                            <Form.Select
                                placeholder="Select Method"
                                value={request.method}
                                options={enumToMap(HTTPMethod)}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setRequest({ ...request, method: e.target.value })}
                                onBlur={handleUpdate}
                            />
                            <Form.Label>METHOD</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col col="6">
                        <Form.Group>
                            <Form.Input
                                value={request.url}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setRequest({ ...request, url: e.target.value })}
                                onBlur={handleUpdate}
                            />
                            <Form.Label>URL</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Button onClick={sendRequest} className="text-white bg-blue-500 hover:bg-blue-600">Send <i className="bi bi-send"></i></Form.Button>
                    </Col>
                </Grid>
            </div>
            <div>
                {JSON.stringify(requestResponse)}
            </div>
        </div>
    )
}

export default Request
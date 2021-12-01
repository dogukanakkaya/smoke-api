import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IRequest } from '../../context/collection/type'
import useRequest from '../../context/request/useRequest'
import { Col } from '../grid/Grid'
import Request from './Request'

const RequestArea = () => {
    const [request, setRequest] = useState<IRequest>()
    const { _id } = useParams()
    const { loading, find } = useRequest()

    useEffect(() => {
        (async () => {
            if (_id) {
                setRequest(await find(_id))
            }
        })()
    }, [_id])

    const createRequest = () => { }

    return (
        <Col col="9" className="border-l">
            <div className="bg-white">
                <div className="flex justify-between items-center border-b pl-2 h-14">
                    <span onClick={createRequest} className="w-8 h-8 flex items-center justify-center cursor-pointer text-xl transition rounded hover:bg-gray-100"><i className="bi bi-plus"></i></span>
                </div>
            </div>
            {
                loading || !request ? <>Loading...</> : <Request request={request} setRequest={setRequest} />
            }
        </Col>
    )
}

export default RequestArea
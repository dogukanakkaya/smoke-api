import { ChangeEvent, SyntheticEvent, useState } from 'react'
import useCollection from '../../context/collection/useCollection'
import Form from '../form/Form'

const FormModal = ({ show, setShow }: { show: boolean, setShow: Function }) => {
    const [title, setTitle] = useState<string>('')
    const { create } = useCollection()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        create({
            title
        }, () => setShow(false))
    }

    return (
        <div className={`${!show ? 'hidden ' : ''}min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-start inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover`}>
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
            <div className="w-full max-w-lg relative mx-auto mt-48 rounded-xl shadow-lg bg-white overflow-hidden">
                <div className="p-5 bg-gray-100">
                    <h1 className="text-gray-800 text-base"><i className="bi bi-list align-middle"></i> Create a Collection</h1>
                </div>
                <div className="p-5">
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Form.Group>
                                <Form.Input onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title} />
                                <Form.Label>Collection Title</Form.Label>
                            </Form.Group>
                        </div>
                        <div className="mt-2 text-center space-x-4 md:block">
                            <button onClick={() => setShow(false)} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button type="submit" className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Create</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default FormModal
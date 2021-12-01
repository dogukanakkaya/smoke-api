import Collections from './Collections'
import QuickAccess from '../../components/collection/QuickAccess'
import Form from '../../components/form/Form'
import { Col } from '../grid/Grid'

const Sidebar = ({ setShowCreateModal }: { setShowCreateModal: Function }) => {
    return (
        <Col col="3" className="grid grid-cols-3 max-h-0">
            <Col col="3">
                <div className="flex justify-between items-center border-b pl-2 h-14 bg-white">
                    <h1 className="text-base font-bold text-gray-800">Scratch Pad</h1>
                    <div>
                        <Form.Button onClick={() => setShowCreateModal(true)} className="bg-white text-gray-600 hover:bg-gray-100">New</Form.Button>
                    </div>
                </div>
            </Col>
            <Col>
                <QuickAccess />
            </Col>
            <Col col="2">
                <Collections />
            </Col>
        </Col>
    )
}

export default Sidebar
import { shallow } from 'enzyme'
import { Status } from '../components/Status';
import { STATUS_DANGER, STATUS_SUCCESS, STATUS_WARNING } from '../helpers/utils';

describe('Status tests', () => {

    test('should render question icon when no status provided', () => {
        const wrapper = shallow(<Status/>);
        expect (wrapper ).toMatchSnapshot();
    });
    test('should render question icon when status undefined', () => {
        const wrapper = shallow(<Status status={undefined}/>);
        expect (wrapper ).toMatchSnapshot();
    });
    test('should render success icon when status success', () => {
        const wrapper = shallow(<Status status={STATUS_SUCCESS}/>);
        expect (wrapper ).toMatchSnapshot();
    });
    test('should render warning icon when status warning', () => {
        const wrapper = shallow(<Status status={STATUS_WARNING}/>);
        expect (wrapper ).toMatchSnapshot();
    });
    test('should render danger icon when status danger', () => {
        const wrapper = shallow(<Status status={STATUS_DANGER}/>);
        expect (wrapper ).toMatchSnapshot();
    });
});
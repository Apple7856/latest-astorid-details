import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer'
import Details from '../Details';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    cleanup();
});

const mockUseLocationValue = {
    pathname: "/details",
    search: '',
    hash: '',
    state: {
        name: "Harry",
        nasa_jpl_url: "xyz",
        is_potentially_hazardous_asteroid: "true"
    }
}

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
}));


describe("Details Component Test", () => {
    
    test("testing", () => {
        expect(true).toBe(true);
    })

    test("Input Field Test", () => {
        const component = render(<Details />);
        const heading = component.getByTestId('heading');
        expect(heading.innerHTML).toBe('Astroid Details');
    })
    test("Name Text Test", () => {
        const component = render(<Details />);
        const nameTest = component.getByTestId('nameTest');
        expect(nameTest.innerHTML).toBe("name: "+mockUseLocationValue.state.name);
    })
    test("nasa_jpl_url Text Test", () => {
        const component = render(<Details />);
        const nasa_jpl_url = component.getByTestId('nasa_jpl_url');
        expect(nasa_jpl_url.innerHTML).toBe("nasa_jpl_url: "+mockUseLocationValue.state.nasa_jpl_url);
    })
    test("Is_potentially_hazardous_asteroid Text Test", () => {
        const component = render(<Details />);
        const is_potentially_hazardous_asteroid = component.getByTestId('is_potentially_hazardous_asteroid');
        expect(is_potentially_hazardous_asteroid.innerHTML).toBe("Is_potentially_hazardous_asteroid: "+mockUseLocationValue.state.is_potentially_hazardous_asteroid);
    })
    test("Create SnapShot", () => {
        const tree = renderer.create(<Details />);
        expect(tree).toMatchSnapshot();
    })

})
import React from "react";
import { requestLogin } from "../../Helpers/axios_helper";

// interface HomeState {
//     data: string[];
// }
interface HomeState {
    data: string[];
}

export default class Home extends React.Component<{}, HomeState> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            data: []
        };
    }

    // componentDidMount(): void {
    //     requestLogin(
    //         "GET",
    //         "messages",
    //         {}
    //     ).then((response) => {
    //         if (Array.isArray(response.data)) {
    //             this.setState({ data: response.data });
    //         } else {
    //             console.error("Received data is not an array:", response.data);
    //         }
    //     }).catch(error => {
    //         console.error("Error fetching data:", error);
    //     });
    // }
    

    render() {
        return (
            <div>
                <p>jdfsij</p>
                {this.state.data && this.state.data.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        );
    }
}

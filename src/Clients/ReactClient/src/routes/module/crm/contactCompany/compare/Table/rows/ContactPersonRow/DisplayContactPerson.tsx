import React from 'react'; 

interface IDisplayContactPersonProps {
    contactPersons: any
}

export interface IDisplayContactPerson {
    contactPersonId: string,
    firstName: string,
    lastName: string
}

class DisplayContactPerson extends React.Component<IDisplayContactPersonProps> {
    public render() {
        const {contactPersons} = this.props;

        const contactPersonsContent = contactPersons ? contactPersons.map((person: IDisplayContactPerson)=> {
            return (
                <div key={`person-${person ? person.contactPersonId : null}`} className="container-contactPerson-table" >
                    <div className="mr-5">
                        <p className="friendly-id-color">{person.contactPersonId}</p>
                    </div>
                    <div className="mr-auto">
                        <p>{person.firstName} {person.lastName}</p>
                    </div>
                </div>
            )
        }) : null

        return (
            contactPersonsContent
        )
    }
}

export default DisplayContactPerson;


const ApplicantCard = ({ applicant }) => {

    console.log(applicant);
    return (
        <>
            <tr>
                <td>{applicant.name}</td>
                <td>{applicant.position}</td>
                <td>{applicant.status}</td>
                <td>{applicant.appliedDate}</td>
                <td>
                    <span>view</span>
                </td>
            </tr>
        </>
    )
}

export default ApplicantCard;

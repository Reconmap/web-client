import PropTypes from 'prop-types';
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

const RelativeDateFormatter = ({ date: dateString }) => {
    let timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
        dateString = dateString.replaceAll('-', '/');
        timestamp = Date.parse(dateString);
    }
    if (isNaN(timestamp)) {
        return dateString;
    }

    return <ReactTimeAgo date={dateString} />
};

RelativeDateFormatter.propTypes = {
    date: PropTypes.string.isRequired
};

export default RelativeDateFormatter;

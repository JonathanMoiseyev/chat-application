function HrefLink({textBeforeLink, textInLink, whereToLink}) {
    return(
        <div className="mx-auto">
            <span>{textBeforeLink}&nbsp;</span>
            <a
                className="text-decoration-none darken-on-hover light-purple fw-600"
                href={whereToLink}
            >
                {textInLink}
            </a>
        </div>
    );
}

export default HrefLink;
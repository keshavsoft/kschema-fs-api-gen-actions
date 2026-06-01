const checkDuplicate = (inContent, inEndpoint) => {
    const localContent = inContent;
    const localEndpoint = inEndpoint;

    return localContent.includes(`app.use("/${localEndpoint}"`);
};

export default checkDuplicate;
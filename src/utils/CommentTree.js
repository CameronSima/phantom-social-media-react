

const toMap = comments => (
    comments.reduce((acc, curr) => {
        acc[curr.id] = curr;
        acc[curr.id]['children'] = [];
        return acc;
    }, {})
)

export const flatCommentsToTree = (comments = []) => {
    let mappedComment;
    let tree = [];
    const map = toMap(comments);

    for (let id in map) {
        if (map.hasOwnProperty(id)) {
            mappedComment = map[id];
            if (mappedComment.parent) {
                map[mappedComment['parent']]['children'].push(mappedComment);
            } else {
                tree.push(mappedComment);
            }
        }
    }
    return tree;
}


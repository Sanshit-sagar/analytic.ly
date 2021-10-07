interface Box<Type> {
    contents: Type;
}
function setContents<Type>(box: Box<Type>, newContents: Type) {
    box.contents = newContents;
}
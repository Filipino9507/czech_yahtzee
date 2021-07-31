export default interface SerializableConvertible<T> {
    toSerializable: () => T;
}
export default abstract class AbstractSeed<T extends object> {
    public abstract async seed(): Promise<T[]>;
}

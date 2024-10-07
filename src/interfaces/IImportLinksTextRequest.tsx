/**
 * Interface defining a text import into the Links program.
 */
export default interface IImportLinksTextRequest{

    /**
     * Format of the input data.
     * 
     * @see DataFormat
     */
    format: string;

    /**
     * The input data.
     * 
     * This should be a string, regardless of the original export format.
     * 
     * eg. JSON should be turned into a JSON string and then placed
     * in this field, rather than a JSON object being transmitted directly.
     */
    text: string;

}
export interface IOptionsProps {
    value: string, 
    label: string,
}
export interface IOption {
    companyOptions?: IOptionsProps[],
    tags?: IOptionsProps[],
    segments?: IOptionsProps[],
    countryOptions?: IOptionsProps[],
}
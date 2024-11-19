// import { DataSourceOptionsBuilder } from "./dataSourceOptionsBuilder";

// export class OrmBuilder {
//     private _dataSourceBuilder: DataSourceOptionsBuilder = DataSourceOptionsBuilder.new();

//     public static new(): OrmBuilder {
//         return new OrmBuilder();
//     }

//     public dataSourceBuilder(fn: (options: DataSourceOptionsBuilder) => DataSourceOptionsBuilder): this {
//         this._dataSourceBuilder = fn(this._dataSourceBuilder);
//         return this;
//     }

//     public dataSource(): this {
//         this._dataSourceBuilder = fn(this._dataSourceBuilder);
//         return this;
//     }

//     public build(): DataSourceOptionsBuilder {
//         return this._dataSourceBuilder;
//     }
// }

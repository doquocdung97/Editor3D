import { ReactNode, useEffect, useState } from "react";
import { ComponetValueCell, ResourcesModel } from "./common";
import { Icon } from "@components/Icon";
import ListInput from "@components/ListInput";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import EditCode from "@components/EditCode";
import TreeView from "../../TreeView";
import ServiceData from "../../service";
class IntegerCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<p title={this.value}>{this.value}</p>
		);
	}
	editer(): ReactNode {
		return (<input type="number" autoFocus={true} value={this.value} onChange={e => { this.onChange(parseInt(e.target.value)) }}></input>)
	}
}
class IntegersCell extends ComponetValueCell {
	view(): ReactNode {
		return <p title={this.value.join(', ')}>{this.value.join(', ')}</p>
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <ListInput data={this.value} type="number" onChange={this.onChangeModal.bind(this)}></ListInput>
		}
	}
}
class StringCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<p title={this.value}>{this.value}</p>
		);
	}
	editer(): ReactNode {
		return (<input type="text" autoFocus={true} value={this.value} onChange={e => { this.onChange(e.target.value) }}></input>)
	}
}
class StringsCell extends ComponetValueCell {
	view(): ReactNode {
		return <p title={this.value.join(', ')}>{this.value.join(', ')}</p>
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <ListInput data={this.value} type="string" onChange={this.onChangeModal.bind(this)}></ListInput>
		}
	}
}
class FloatCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<p title={String(this.value)}>{String(this.value)}</p>
		);
	}
	editer(): ReactNode {
		return (<input type="number" autoFocus={true} value={this.value} onChange={e => { this.onChange(parseFloat(e.target.value)) }}></input>)
	}
}
class FloatsCell extends ComponetValueCell {
	view(): ReactNode {
		return <p title={this.value.join(', ')}>{this.value.join(', ')}</p>
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <ListInput data={this.value} type="float" onChange={this.onChangeModal.bind(this)}></ListInput>
		}
	}
}
class BooleanCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<p>{this.value ? "True" : "False"}</p>
		);
	}
	editer(): ReactNode {
		return (
			<select onChange={e => { this.onChange(e.target.value) }} value={this.value}>
				<option value="true">True</option>
				<option value="false">False</option>
			</select>
		)
	}
	onChange(val: any): void {
		super.onChange(val == 'true' ? true : false)
	}
}
class BooleanCellView extends BooleanCell{
	isEditRow = false
}
class ObjectCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<p>{this.value?.name}</p>
		);
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <ListInput data={this.value} type="number"></ListInput>
		}
	}
}
class ObjectsCell extends ComponetValueCell {
	view(): ReactNode {
		let vals = []
		if(this.value && this.value.length > 0){
			vals = this.value.map((n:any)=>n.name)
		}
		return (
			<p>{vals.join(", ")}</p>
		);
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <ListInput data={this.value} type="number"></ListInput>
		}
	}
}
class MediaCell extends ComponetValueCell {
	view(): React.ReactNode {
		if (this.value){
			return (<p>Media({this.value.name})</p>);
		}else{
			return (<></>);
		}
  }
	onSelect(e:any[]){
		if(e && e.length > 0){
			this.onChangeModal(e[0].data)
		}
	}
	onChangeModal(val: any) {
    this.setState({ newvalue: val })
  }
	convert(row: any) {
		if(row?.original?.value){
			row.original_value = row.original.value.uuid
		}
		return row
	}
	getResourcesModel(): ResourcesModel | undefined {
		var data:any[] = []
		const result = ServiceData.get("media")
		if(result){
			data = result.children
		}
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <TreeView data={data} onSelect={this.onSelect.bind(this)}/>
		}
	}
}
class MediasCell extends ComponetValueCell {
	view(): React.ReactNode {
		if (this.value){
			const medias = this.value.map(x=>x.name)
			return <p title={medias.join(', ')}>{medias.join(', ')}</p>
		}else{
			return (<></>);
		}
  }
	onSelect(e:any[]){
		this.onChangeModal(e.map(x=>x.data))
	}
	onChangeModal(val: any) {
    this.setState({ newvalue: val })
  }
	convert(row: any) {
		if(row?.original?.value){
			row.original_value = row.original.value.map(x=>x.uuid)
		}
		return row
	}
	getResourcesModel(): ResourcesModel | undefined {
		var data:any[] = []
		const result = ServiceData.get("media")
		if(result){
			data = result.children
		}
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <TreeView data={data} 
				multiselection={false}
				onSelect={this.onSelect.bind(this)}
			/>
		}
	}
}
class ColorCell extends ComponetValueCell {
	rgba2hex(orig) {
		var a,
			alpha = orig.a,
			hex = orig ?
			(orig.r | 1 << 8).toString(16).slice(1) +
			(orig.g | 1 << 8).toString(16).slice(1) +
			(orig.b | 1 << 8).toString(16).slice(1) : orig;
		if(alpha){
			a = ((alpha * 255) | 1 << 8).toString(16).slice(1)
			hex = hex + a;
		}
		return `#${hex}`;
	}
	view(): ReactNode {
		let alpha = 0
		if(this.value.a > 0){
			alpha = parseFloat(this.value.a.toFixed(1))
		}
		return (
			<div className="color-cell" >
				<div className="color-value" style={{ background: this.rgba2hex(this.value) }}>
					{
						(this.value) && (
							<label>rgba({this.value.r},{this.value.g},{this.value.b},{alpha})</label>
						)
					}
				</div>
			</div>
		)
		
	}
	onChangeModal(val:any){
		val.r = val.r | 0
		val.g = val.g | 0
		val.b = val.b | 0
		super.onChangeModal(val)
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "sm",
			body: <div className="edit-color-cell">
				<Colorful color={this.rgba2hex(this.state.newvalue)} onChange={(e) => {
					this.onChangeModal(e.rgba)
				}} />
			</div>
		}
	}
}
class JsonCell extends ComponetValueCell {
	view(): ReactNode {
		return <p title={JSON.stringify(this.value)}>{JSON.stringify(this.value)}</p>
	}
	onChange(val: any): void {
		try {
			val = JSON.parse(val)
			super.onChange(val)
		} catch (error) {
			this.setState({ messageerror: "Json is malformed"})
		}
	}
	getResourcesModel(): ResourcesModel | undefined {
		return {
			title: `Edit ${this.name}`,
			size: "lg",
			body: <div className="edit-json-cell"  style={{margin:" -16px -16px 0 -16px"}}>
				<EditCode type="json"
					value={JSON.stringify(this.value, null, "\t")}
					onChange={this.onChangeModal.bind(this)}>
				</EditCode>
			</div>
		}
	}
}
class FunctionCell extends ComponetValueCell {
	view(): ReactNode {
		return (
			<button>test</button>
		);
	}
}
export default {
	"PropertyString": StringCell,
	"PropertyStrings": StringsCell,
	"PropertyInteger": IntegerCell,
	"PropertyIntegers": IntegersCell,
	"PropertyFloat": FloatCell,
	"PropertyFloats": FloatsCell,
	"PropertyBool": BooleanCell,
	"PropertyBoolView": BooleanCellView,
	"PropertyObject": ObjectCell,
	"PropertyObjects": ObjectsCell,
	"PropertyMedias": MediasCell,
	"PropertyMedia": MediaCell,
	"PropertyColor": ColorCell,
	"PropertyJson": JsonCell,
	"PropertyFunction":FunctionCell
}
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import postSchema from "@/utils/schema/postSchema";
import { useFormik } from "formik";

export default function Post(){

    const initialValues = {
        title:"",
        description:""
    }

    const {values,errors,handleBlur,handleChange,handleSubmit , touched} = useFormik({
        validationSchema: postSchema,
        initialValues,
        onSubmit: (values) => {
          console.log(values);
          alert("Post created successfully !")
        }
    })
    return (
         <Card className="p-0" >
            <div className="p-6 border-b border-border">
              <h5 className="text-lg font-semibold text-dark leading-none">Create Post And Share</h5>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 p-6 pt-0" >
            {/* Post title */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="title"
                className="text-dark font-medium text-sm"
              >
                Title
              </Label>
              <div>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter post title..."
                  value={values.title}
                  className={`${touched.title && errors.title ? 'border-red-500 focus:border-red-500': null}`}
                />
              </div>
              {touched.title && errors.title ? <p className="text-sm text-red-500 font-medium" >{errors.title}</p> : null} 
            </div>
            {/* Post description */}
            <div className="flex flex-col gap-1.5 lg:col-span-6 col-span-12">
              <Label
                htmlFor="description"
                className="text-dark font-medium text-sm"
              >
                Description
              </Label>
              <div>
              <Textarea onChange={handleChange} onBlur={handleBlur} className={`${touched.title && errors.title ? 'border-red-500 focus:border-red-500': null}`} value={values.description} name="description" id="description" placeholder="Enter post description..." />
              </div>
              {touched.description && errors.description ? <p className="text-sm text-red-500 font-medium" >{errors.description}</p> : null} 
            </div>
            <div className="col-span-12">
                <div className="flex justify-center">
                <Button type="submit" className="w-fit" >Submit</Button>
                </div>
            </div>
            </form>
         </Card>
    )
}
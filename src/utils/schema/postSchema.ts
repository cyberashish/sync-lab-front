import * as Yup from "yup";

const postSchema = Yup.object({
    title: Yup.string().min(3).max(20).required("Please provide valid post tile"),
    description: Yup.string().min(5).max(70).required("Please provide valid desscription")
});

export default postSchema

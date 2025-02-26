import * as yup from "yup";
import dayjs from "dayjs";

export const callStatFormSchema = yup.object({
  callDate: yup.string().test({
    test(value) {
      return dayjs(value).isValid();
    },
  }),
  basicDetails: yup.object({
    appointments: yup.number().required("Appointments count is required."),
    callBacks: yup.number().required("Callbacks count is required."),
    calls: yup.number().required("Calls count is required."),
    followUps: yup.number().required("Follow Ups count is required."),
    pitched: yup.number().required("Pitched Calls count is required."),
    recordingsSent: yup.boolean().required("Recordings Sent is required."),
  }),
  requests: yup.object({
    email: yup.number().required("Email requests count is required."),
    whatsApp: yup.number().required("WhatsApp requests count is required."),
    linkedin: yup.number().required("Linkedin requests count is required."),
  }),
  timings: yup.array().of(
    yup.object({
      title: yup.string().required("Title is required"),
      hours: yup.number().required("Hours is required"),
      minutes: yup.number().required("Minutes is required"),
    })
  ),
});

import { ref } from 'vue'
import { GetFormClientUse } from './GetFormClient.use'

export const useContactForm = (getFormClient: GetFormClientUse) => {
  const email = ref<string>()
  const name = ref<string>()
  const arrivalDate = ref<string>()
  const departureDate = ref<string>()
  const message = ref<string>()

  const formStatusMessage = ref<string>()
  const showForm = ref<boolean>(true)

  const onSubmit = async (): Promise<void> => {
    const status = await getFormClient.postContactRequest({
      'E-Mail': email.value,
      Name: name.value,
      Anreisedatum: arrivalDate.value,
      Abreisedatum: departureDate.value,
      Nachricht: message.value,
    })

    if (status > 299) {
      formStatusMessage.value = 'Es ist ein Fehler aufgetreten'
    } else {
      formStatusMessage.value =
        'Ihre Anfrage wurde erfolgreich übermittelt. Vielen Dank! Wir werden uns in den nächsten Tagen bei Ihnen melden.'
      showForm.value = false
    }
  }

  return {
    onSubmit,
    formStatusMessage,
    showForm,
    model: {
      email,
      name,
      arrivalDate,
      departureDate,
      message,
    },
  }
}

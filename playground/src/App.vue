<script setup lang="ts">
import { useForm } from "../../src/main";

const { formProps, handleSubmit } = useForm();

const submit = handleSubmit((data, reset) => {
  console.log("Form submitted with data:", data);

  reset({
    email_input: "infoangelchavez@gmail.com",
  });
});
</script>

<template>
  <form v-bind="formProps" @submit="submit">
    <input type="email" name="email_input" value="test@example.com" />
    <input type="file" name="file_input" />
    <input type="image" name="image_input" src="example.png" alt="Submit" />
    <input type="number" name="number_input" value="42" />
    <input type="password" name="password_input" value="123456" />
    <input type="search" name="search_input" value="query" />
    <input type="submit" name="submit_input" value="Submit" />
    <input type="tel" name="tel_input" value="+1234567890" />
    <input type="text" name="text_input" value="hello world" />
    <input type="url" name="url_input" value="https://example.com" />

    <button type="submit">Send</button>
  </form>
</template>

<style>
body {
  background-color: #1a1a1a;
}
</style>

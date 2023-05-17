function SubmitFormButton({writingOnButton}) {
  return (
    <button
        type="submit"
        className="btn bg-light-purple darken-on-hover w-100 text-white fw-600 py-2 mb-4"
    >
        {writingOnButton}
    </button>
  );
}

export default SubmitFormButton;
try {
  const response = await fetch("http://localhost:3000/api/v1/health");
  if (response.ok) {
    process.exit(0);
  } else {
    process.exit(1);
  }
} catch {
  process.exit(1);
}

export {};

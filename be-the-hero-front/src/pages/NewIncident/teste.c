#include <stdio.h>

int main(void) {
  printf("Hello ");
  goto q1;
  printf("Teste");
  
  q1:
    printf("World!");
  return 0;
}
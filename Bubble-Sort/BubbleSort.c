#include<stdio.h>
void insertArray(int[], int);
void sortArray(int[], int);
void displayArray(int[], int);
void swap(int*, int*);

int main() {
    int size = 6;
    int arr[6];

    insertArray(arr,size);
    sortArray(arr,size);
    displayArray(arr,size);

    return 0;
}

void insertArray(int arr[], int size)
{
   int i;
   printf("Enter element in Array\n");
   for (i = 0; i < size-1; i++)
   {
       scanf("%d",&arr[i]);
   }
}
void sortArray(int arr[], int size)
{
    int i,j,temp;
    int flag=0;

    for (i = 0; i < size-2; i++)
   {
       for(j = 0;j < size-1-i; j++)
       {
           
           if(arr[j]>arr[j+1])
           {
               flag=1;
               swap(&arr[j], &arr[j+1]);
           }
       }
       if(flag == 0)
       {
           printf("Already ");
           break;
       }
   }
}
void displayArray(int arr[], int size)
{
    int i;
    printf("Sorted Array\n");
    for (i = 0; i < size-1; i++)
   {
       printf("%d\t",arr[i]);
   }
}

void swap(int *a, int *b)
{
    int temp;
    temp = *a;
    *a = *b;
    *b = temp;
}